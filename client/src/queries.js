import { gql } from 'apollo-boost'

/* Blogs Queries */

export const GET_BLOGS = gql`

query {
  getBlogs {
    _id
    title
    imageUrl
  }
}

`;

/**Users Queries */
export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      _id
      username
      email
      password
      avatar
      joinDate
      favorites {
        _id
        title
        imageUrl
      }
    }
  }

`;

export const INFINITE_SCROLL_BLOGS = gql`
  query ($pageNum: Int!, $pageSize: Int!) {
    infiniteScrollBlogs(pageNum: $pageNum, pageSize: $pageSize) {
      hasMore
      blogs {
        _id
        title
        imageUrl
        categories
        description
        likes
        createdDate
        messages {
          _id
        }
        createdBy {
          _id
          username
          avatar
        }
      }
    }
  }

`;

/**Blogs Mutations */
export const ADD_BLOG = gql`
mutation (
  $title: String!,
  $imageUrl: String!,
  $categories: [String]!,
  $description: String!,
  $createdId: ID!
) {
  addBlog(
    creatorId: $createdId, 
    title: $title,
    imageUrl: $imageUrl,
  categories: $categories,
  description: $description) {
    _id
    title
    imageUrl
    categories
    description

  }
}

`;

/**User Mutations */
export const SIGNIN_USER = gql`
  mutation($username: String!, $password: String!) {
    signinUser(username: $username, password: $password) {
      token
    }
  }

`;


export const SIGNUP_USER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
  signupUser (username: $username, 
    email: $email, 
    password: $password) {
    token
  }
}
`