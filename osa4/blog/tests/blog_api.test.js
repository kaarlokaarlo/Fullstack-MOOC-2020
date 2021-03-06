const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test-helper')
const app = require('../app')
const bcrypt = require('bcryptjs')
const api = supertest(app)

const User = require('../models/user')
const Blog = require('../models/blog')
const { notify } = require('../controllers/blogs')
const { init } = require('../app')


const initialBlogs = [
    {
     title: "Elämäni kesä",
     author: "Jukka Palmu",
     url: "palmu.com",
     likes: 20,
     },
     {
    title: "1000 vinkkiä elämään",
    author: "Jukka Palmu",
    url: "palmu.com",
    likes: 90,
    },
    {
    title: "Perus teet",
    author: "Maija Muu",
    url: "tee.fi",
    likes: -3,
    }
]


describe("When there is some blogs", () => {

  beforeEach(async () => {
    await Blog.deleteMany({})
    console.log('cleared')
    await Blog.insertMany(initialBlogs)
    console.log('done')
})

test('Blogs are JSON', async () => {
    
     await api
    .get('/api/blogs')   
    .expect(200)
    .expect('Content-Type', /application\/json/)

}) 

test('There are three blogs', async() => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(3)
})
})


describe('Adding blogs', () => {

beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({username: 'Juuri', passwordHash})

    await user.save()
  })

test('Blogs can be added', async() => {




    const newBlog = {
            title: "Mysliaamu",
            author: "Jukka Palmu",
            url: "palmu.com",
            likes: 233 ,
        }
    

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    //const response = await api.get('/api/blogs')
    //const blogs = response.body.map(t => t.title)
    const blogsAtEnd = await helper.blogsInDb()
    const contents = blogsAtEnd.map(b => b.title)
   // expect(response.body).toHaveLength(initialBlogs.length+1)
    expect(blogsAtEnd.length).toBe(initialBlogs.length + 1)
    //expect(blogs).toContain('Mysliaamu')
    expect(contents).toContain('Mysliaamu')
})

test('If likes is undefined, it is updated to 0', async() => {

    const newBlog = {
        title: "Banaaniletut",
        author: "Jukka Palmu",
        url: "palmu.com",
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    //const response = await Blog.find({})//await api.get('/api/blogs')
    const blogsAtEnd = await helper.blogsInDb()
    const newestBlog = blogsAtEnd.reverse()[0]
    console.log(newestBlog.likes)

   // console.log(response.reverse()[0])
    //console.log(newestBlog)
    expect(newestBlog.likes).toBe(0)
})

test('Blog has title and url', async() => {

    const newBlog = {
        author: "Huu Haa",
        likes: 4,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

        //const response = await Blog.find({})
        //console.log(response)
        

})
})


describe('when there is initially one user at db', () => {
    beforeEach(async () => {
      await User.deleteMany({})
  
      const passwordHash = await bcrypt.hash('sekret', 10)
      const user = new User({username: 'root', passwordHash})
  
      await user.save()
    })
  
    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()
  

      const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen',
        }
        //console.log('taa toimii')
      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)
  
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd.length).toBe(usersAtStart.length + 1)
  
      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).toContain(newUser.username)
    })
    

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
          username: 'root',
          name: 'Superuser',
          password: 'salainen',
        }
    
        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)
    
        expect(result.body.error).toContain('`username` to be unique')
    
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
      })

  })


describe('when adding new users', () => {
    beforeEach(async () => {
      await User.deleteMany({})
  
      const passwordHash = await bcrypt.hash('sekret', 10)
      const user = new User({username: 'root', passwordHash})
  
      await user.save()
    })
    
test('creation fails with a too short username', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'ml',
        name: 'Matti Luukkainen',
        password: 'salainen',
        }
        //console.log('taa toimii')
      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        //.expect('Content-Type', /application\/json/)
  
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd.length).toBe(usersAtStart.length)
  
      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).not.toContain(newUser.username)
    })

    test('creation fails with a too short password', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'matti',
        name: 'Matti Luukkainen',
        password: 'sa',
        }
        //console.log('taa toimii')
      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        //.expect('Content-Type', /application\/json/)
  
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd.length).toBe(usersAtStart.length)
  
      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).not.toContain(newUser.username)
    })
    
  })

afterAll(() => {
    mongoose.connection.close()
})