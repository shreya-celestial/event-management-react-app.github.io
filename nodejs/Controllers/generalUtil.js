const getTextValue = (value) => {
  let text = value.split('>')
  if (text.length > 1) {
    text = text[1]
    text = text.split('<')[0]
    text = text.trim()
    return text;
  }
  else
    return text[0]
}

module.exports = { getTextValue }