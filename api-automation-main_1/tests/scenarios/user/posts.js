import { createUser, createUserPost, getUserPost, deleteUserPost, deleteUser } from '../../steps/user/posts.js'
import { generateTestData } from '../../utils/helpers.js'

before(async () => {
    await generateTestData()
})

describe('Create user Post ', () => {
    describe(`Create User`, () => {
        createUser(),
        createUserPost(),
        getUserPost(),
        deleteUserPost(),
        deleteUser()
    })
})
