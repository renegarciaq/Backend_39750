const bcrypt = require('bcrypt')


const hasData = data => {
  return bcrypt.hash(data, 10)
}
const compareData = async (data, dataDB) => {
  return bcrypt.compare(data, dataDB)
}

module.exports = {
  hasData,
  compareData
}