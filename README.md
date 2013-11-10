bees_blog
=========

Creating a blog using Node, (Express / Jade) and MongoDB

Current Features:
-----------------

- View paginated blog list
- View pages from database
- Send emails through contact us form (email config required)
- Filter by author / tags
- Lightweight responsive design
- Seperate admin & blog servers
- Session based username / password authentication for admin area
- Admin area with post list / form (submission not working)

Run Instructions:
-----------------

1. Install Node and MongoDB
2. Navigate to project directory and run <code>npm install</code>
3. <code>mongo</code>, <code>use bees_blog</code> then <code>load('{blog path}/import.js');</code>
4. <code>node app.js</code>