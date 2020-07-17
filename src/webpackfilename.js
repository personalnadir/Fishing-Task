// assumes Webpack is using the following format for filenames: static/media/[name].[hash:8].[ext]
const pattern = /static\/media\/(\w+)/;

const getFileNameFromWebpackPath = path => path.match(pattern)[1];
export default getFileNameFromWebpackPath;