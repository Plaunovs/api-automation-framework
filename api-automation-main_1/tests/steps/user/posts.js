import { request } from '../../utils/requests.js'
import { getCreateUserRequestBody } from '../../utils/requestBodyGenerator/user.js'

export async function createUser() {
    it('Create user account', async function () {
        const requestBody = await getCreateUserRequestBody()
        await request(this, 'POST', '/users', requestBody, true, 
            {
                statusCode : 201,
                expectedFields: ['email'],
                expectedValues: [
                                    {path: 'name', value: requestBody.name},
                                    {path: 'gender', value: requestBody.gender},
                                    {path: 'status', value: requestBody.status}
                                ],
                executionVariables: [
                                        {path: 'id', name: 'userId'}, 
                                    ]
            }
        )
    })
    
}

export async function createUserPost() {
    it('Create user Post', async function () {
        const postBody = {
            title: 'My First Post',
            body: 'This is the content of the post.',
            user_id: global.executionVariables['userId']
        };
        await request(this, 'POST', `/posts`, postBody, true, 
            {
                statusCode: 201,
                executionVariables: [
                    { path: 'id', name: 'postId' }
                ],
                expectedValues: [
                    { path: 'user_id', value: postBody.user_id },
                    { path: 'title', value: postBody.title },
                    { path: 'body', value: postBody.body }
                ]
            }
        )
    })
}

export async function getUserPost() {
    it('Get user post', async function () {
        await request(this, 'GET', `/posts/${global.executionVariables['postId']}`, undefined, true, 
            {
                statusCode: 200,
                expectedValues: [
                    { path: 'id', value: global.executionVariables['postId'] },
                    { path: 'user_id', value: global.executionVariables['userId'] }
                ]
            }
        )
    })
}

export async function deleteUserPost() {
    it('Delete user post', async function () {
        await request(this, 'DELETE', `/posts/${global.executionVariables['postId']}`, undefined, true, 
            {
                statusCode: 204
            }
        )
    })
}

export async function deleteUser() {
    it('Delete user account', async function () {
        await request(this, 'DELETE', `/users/${global.executionVariables['userId']}`, undefined, true, 
            {
                statusCode : 204,
            }
        )
    })
    
}