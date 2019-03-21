const { Router } = require('express')
const fetch = require('node-fetch')
const { KAKAO_APP_KEY } = require('../config')

const REGION = {
  서울: '서울특별시',
  부산: '부산광역시',
  대구: '대구광역시',
  인천: '인천광역시',
  광주: '광주광역시',
  대전: '대전광역시',
  울산: '울산광역시',
  세종: '세종특별자치시',
  경기: '경기도',
  강원: '강원도',
  충북: '충청북도',
  충남: '충청남도',
  전북: '전라북도',
  전남: '전라남도',
  경북: '경상북도',
  경남: '경상남도',
  제주: '제주특별자치도'
}

function address() {
  const router = Router()

  router.get('/', async (req, res) => {
    const { x, y } = req.query
    const response = await fetch(
      `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${x}&y=${y}`,
      {
        headers: {
          Authorization: `KakaoAK ${KAKAO_APP_KEY}`
        }
      }
    )
    const data = await response.json()
    const items = data.documents.map(
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
  })

  router.get('/:keyword', async (req, res) => {
    const response = await fetch(
      `https://spi.maps.daum.net/postcode/group?region_name=${encodeURIComponent(
        req.params.keyword
      )}`
    )
    const data = await response.json()

    const items = data.postcode[0].region.map(({ name, code }) => {
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
  })

  return router
}

module.exports = address
