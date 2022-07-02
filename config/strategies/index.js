const files = fs.readdirSync(__dirname)
for (const file of files) {
  if (file != 'index.js') {
    require(path.join(__dirname, file))
  }
}