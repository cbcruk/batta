import { REGION } from './constants'
import rpc from '../../../lib/kakao/rpc'

async function address(req, res) {
  const hasKeyword = Boolean(req.query.keyword)

  if (hasKeyword) {
    const response = await rpc(
      `/v2/local/search/address.json?query=${encodeURIComponent(
        req.query.keyword
      )}`
    )

    const items = response.data.documents.map(({ address }) => {
      return {
        address_name: address.address_name,
        region1: REGION[address.region_1depth_name],
        region2: address.region_2depth_name,
        region3: address.region_3depth_name || address.region_3depth_h_name,
        code: address.b_code || address.h_code
      }
    })

    res.json({
      items
    })
  } else {
    const { x, y } = req.query
    const response = await rpc(
      `/v2/local/geo/coord2regioncode.json?x=${x}&y=${y}`
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
}

export default address
