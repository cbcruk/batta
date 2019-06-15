const express = require('express')
const { axios } = require('../../lib/axios')
const { KAKAO_APP_KEY } = require('../../config')
const { REGION } = require('./constants')

const app = express()

app.get('*', async (req, res) => {
  const isKeyword = Boolean(req.query.keyword)

  if (isKeyword) {
    const response = await axios.get(
      `https://spi.maps.daum.net/postcode/group?region_name=${encodeURIComponent(
        req.query.keyword
      )}`
    )

    const items = response.data.postcode[0].region.map(({ name, code }) => {
      const [_region1, _region2, _region3, _region4] = name.split(' ')
      const region1 = REGION[_region1]
      const region2 = [...(_region4 ? [_region2, _region3] : [_region2])].join(
        ' '
      )
      const region3 = _region4 || _region3
      const address_name = [region1, region2, region3].join(' ')

      return {
        address_name,
        region1,
        region2,
        region3,
        code
      }
    })

    res.json({
      items
    })
  } else {
    const { x, y } = req.query
    const response = await axios.get(
      `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${x}&y=${y}`,
      {
        headers: {
          Authorization: `KakaoAK ${KAKAO_APP_KEY}`
        }
      }
    )
    const items = response.data.documents.map(
      ({
        address_name,
        region_1depth_name: region1,
        region_2depth_name: region2,
        region_3depth_name: region3,
        code
      }) => {
        return {
          address_name,
          region1,
          region2,
          region3,
          code
        }
      }
    )

    res.json({
      items
    })
  }
})

module.exports = app
