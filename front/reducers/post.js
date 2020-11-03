export const initialState = {
    mainPosts: [{
      id: 1,
      User: {
        id: 'hskimaa1',
        nickname: '김한솔1',
      },
      content: '김한솔게시글1',
      Images: [{},],
      Comments: [{
        User: {
          nickname: '댓글1',
        },
        content: '댓글컨텐츠1',
      }, {
        User: {
          nickname: '댓글2',
        },
        content: '댓글컨텐츠2',
      }]
    },
    {
      id: 2,
      User: {
        id: 'hskimaa1',
        nickname: '김한솔2',
      },
      content: '김한솔게시글2',
      Images: [{},],
      Comments: [{
        User: {
          nickname: '댓글1',
        },
        content: '댓글컨텐츠1',
      }, {
        User: {
          nickname: '댓글2',
        },
        content: '댓글컨텐츠2',
      }]
    }],
    imagePaths: [],
    postAdded: false,
  };
  
  const ADD_POST = 'ADD_POST';
  
  export const addPost = {
    type: ADD_POST,
  };
  
  const dummyPost = {
    id: 2,
    content: '1',
    User: {
      id: 1,
      nickname: '1',
    },
    Images: [],
    Comments: [],
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case ADD_POST: {
        return {
          ...state,
          mainPosts: [dummyPost, ...state.mainPosts],
          postAdded: true,
        };
      }
      default: {
        return {
          ...state,
        };
      }
    }
  };
  