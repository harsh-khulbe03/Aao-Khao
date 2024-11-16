import fetch from "cross-fetch";

export async function getInitialSetOfRestaurants(_, res) {
  try {
    const result = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.6372727&lng=77.345005&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING",
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
        },
      }
    );
    const data = await result.json();
    return res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch data." });
  }
}

export async function getMenuDetailsOfSpecificRestaurant(req, res) {
  const { id } = req.params;
  const url = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.6280075&lng=77.3607098&restaurantId=${id}&catalog_qa=undefined&submitAction=ENTER`;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
    },
  });

  const data = await response.json();
  return res.json(data);
}

export async function updateListOfRestaurants(req, res) {
  const { noOfRestaurants } = req.params;
  const url = "https://www.swiggy.com/dapi/restaurants/list/update";
  const headers = {
    Accept: "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Content-Type": "application/json",
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:132.0) Gecko/20100101 Firefox/132.0",
    Referer: "https://www.swiggy.com/",
    Origin: "https://www.swiggy.com",
  };

  const body = JSON.stringify({
    lat: "28.6372727",
    lng: "77.345005",
    nextOffset: "CJhlELQ4KIDQ7eXz9aO/cjCnEzgC",
    widgetOffset: {
      NewListingView_category_bar_chicletranking_TwoRows: "",
      NewListingView_category_bar_chicletranking_TwoRows_Rendition: "",
      Restaurant_Group_WebView_SEO_PB_Theme: "",
      collectionV5RestaurantListWidget_SimRestoRelevance_food_seo: `${noOfRestaurants}`,
      inlineFacetFilter: "",
      restaurantCountWidget: "",
    },
    filters: {},
    seoParams: {
      seoUrl: "https://www.swiggy.com/",
      pageType: "FOOD_HOMEPAGE",
      apiName: "FoodHomePage",
    },
    page_type: "DESKTOP_WEB_LISTING",
    _csrf: "UMBVwkIO69dh-B2jsqci_ai3Punn4nyBxqdNOlgU",
  });

  const response = await fetch(url, {
    method: "POST",
    headers: headers,
    body: body,
  });

  const data = await response.json();
  return res.json(data);
}

