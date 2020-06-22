import gql from 'graphql-tag';

export const githubPublicListQuery = gql`
query listRepos($queryString: String!, $cursor: String){
    rateLimit{
     cost
     remaining
     resetAt
    }
    search(query:$queryString, type:REPOSITORY, first:20, after: $cursor){  
     repositoryCount
     pageInfo{
      endCursor
      startCursor
     }
     edges{
        cursor
      node{
       ... on Repository{
        id
        stargazers {
            totalCount
        }        
        name
        createdAt 
        description 
        isArchived
        isPrivate
        url
        owner{
         login
         id
         __typename
         url
        }
        assignableUsers{
         totalCount
        }
        licenseInfo{
         key
        }
        defaultBranchRef{
         target{
          ... on Commit{
           history(first:10){
            totalCount
            edges{
             node{
              ... on Commit{
               committedDate
              }
             }
            }
           }
          }
         }
        }
       }
      }
     }
    }
   }`



//    collaborators{
//     nodes{
//       contributionsCollection{
//         contributionCalendar{
//           totalContributions
//         }
//       }
//     }
//   }