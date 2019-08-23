const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createToken = (user, secret, expiresIn) => {
    const { username, email } = user;
    return jwt.sign({ username, email }, secret, { expiresIn });
}

module.exports = {
    Query: {
        getCurrentUser: async (_, args, { User, currentUser }) => {
            if (!currentUser) {
                return null;
            }

            const user = await User.findOne({ username: currentUser.username }).populate({
                path: 'favorites',
                model: 'Blog'
            });
            return user;
        },
        getBlogs: async (_, args, { Blog }) => {
            const blogs = await Blog.find({}).sort({ createdDate: 'desc' })
                .populate({
                    path: 'createdBy',
                    model: 'User'
                });
            return blogs
        },

        getBlog: async (_, { blogId }, { Blog }) => {
            const blog = await Blog.findOne({ _id: blogId }).populate({
                path: 'messages.messageUser',
                model: 'User'
            })
            return blog
        },

        infiniteScrollBlogs: async (_, { pageNum, pageSize }, { Blog }) => {
            let blogs;

            if (pageNum === 1) {
                blogs = await Blog.find({}).sort({ createdBy: 'desc' }).populate({
                    path: 'createdBy',
                    model: 'User'
                }).limit(pageSize)
            } else {
                // If page is greater than one, figure out how many documents to skip
                const skips = pageSize * (pageNum - 1)
                blogs = await Blog.find({}).sort({ createdBy: 'desc' }).populate({
                    path: 'createdBy',
                    model: 'User'
                }).skip(skips).limit(pageSize)
            }

            const totalDocs = await Blog.countDocuments();
            const hasMore = totalDocs > pageSize * pageNum

            return { blogs, hasMore }
        }
    },
    Mutation: {
        addBlog: async (_, { title, imageUrl, categories, description, creatorId }, { Blog }) => {
            const newBlog = await new Blog({
                title,
                imageUrl,
                categories,
                description,
                createdBy: creatorId
            }).save();

            return newBlog;
        },
        addBlogMessage: async (_, { messageBody, userId, blogId }, { Blog }) => {
            const newMessage = {
                messageBody,
                messageUser: userId
            }

            const blog = await Blog.findOneAndUpdate(
                // find blog by id
                { _id: blogId },

                // prepend (push) new message to beginning of the messages array
                { $push: { messages: { $each: [newMessage], $position: 0 } } },

                // return fresh document after update
                { new: true }
            ).populate({
                path: 'message.messageUser',
                model: 'User'
            })

            return blog.messages[0]
        },
        signinUser: async (_, { username, password }, { User }) => {
            const user = await User.findOne({ username });

            if (!user) {
                throw new Error('User not found!');
            }

            const isValidPassword = await bcrypt.compare(password, user.password);

            if (!isValidPassword) {
                throw new Error('Invalid password!')
            }

            return { token: createToken(user, process.env.SECRET, '1hr') };
        },
        signupUser: async (_, { username, email, password }, { User }) => {
            const user = await User.findOne({ username });

            if (user) {
                throw new Error('User already exists')
            }

            const newUser = await new User({
                username,
                email,
                password
            }).save();

            return { token: createToken(newUser, process.env.SECRET, '1hr') };

        }
    }
}