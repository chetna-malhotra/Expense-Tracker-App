export default(state,action)=>{
    switch(action.type)
    {
        case 'USER_LOADING':
        return{
            ...state,
            isLoading:true
        };
        case 'USER_LOADED':
            return{
                ...state,
                isAuthenticated:true,
                isLoading:false,
                user:action.payload
            };
        case 'LOGIN_SUCCESS':
        case 'REGISTER_SUCCESS':
          {
              return{
                ...state,
                ...action.payload,
                isAuthenticated:true,
                isLoading:false,
               
              }

          }  
          case 'LOGIN_FAIL':
        case 'REGISTER_FAIL':
        case 'AUTH_ERROR':
            return{
                ...state,
                token:null,
                isAuthenticated:false,
                isLoading:false
            }
                
        
        default:
            return state;
        }
    
}