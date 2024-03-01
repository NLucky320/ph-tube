// API
// All category : - https://openapi.programming-hero.com/api/videos/categories

// ALL data by categoryId
// URL Format: - https://openapi.programming-hero.com/api/videos/category/${id}

// Example: - https://openapi.programming-hero.com/api/videos/category/1000

const buttonContainer = document.getElementById("btn-container");
const cardContainer = document.getElementById("card-container");
let selectedCategory = 1000;
const errorElement = document.getElementById("error-element");

const fetchCategories = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await response.json();
  const categories = data.data;
  displayButton(categories);
  fetchDataByCategory(selectedCategory);
};

const displayButton = (categories) => {
  categories.forEach((card) => {
    // console.log(card);

    const categoryButton = document.createElement("button");
    categoryButton.innerText = card.category;
    categoryButton.classList =
      "btn text-[25px] font-semibold hover:bg-[#FF1F3D] hover:text-white";

    categoryButton.addEventListener("click", () =>
      fetchDataByCategory(card.category_id)
    );
    buttonContainer.appendChild(categoryButton);
  });
};

const fetchDataByCategory = async (categoryId) => {
  //   console.log(categoryId);
  selectedCategory = categoryId;
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
  );
  const data = await response.json();
  const details = data.data;
  if (details.length === 0) {
    errorElement.classList.remove("hidden");
  } else {
    errorElement.classList.add("hidden");
  }
  console.log(details);
  displayVideo(details);
};
const displayVideo = (details) => {
  cardContainer.innerHTML = "";
  details.forEach((detail) => {
    let verifiedBadge = "";
    if (detail.authors[0].verified) {
      verifiedBadge = `<img class="w-6 h-6" src="./verified.svg" alt="">`;
    }
    console.log(detail);
    const videoContainer = document.createElement("div");
    videoContainer.innerHTML = `
        
      <div class="card w-full bg-base-100 shadow-xl">
        <figure class="overflow-hidden h-72">
          <img class="w-full" src="${
            detail.thumbnail || ""
          }" alt="Video Thumbnail" />
          <h6 class="absolute bottom-[40%] right-12">${
            detail.duration || "0 hr"
          }</h6>
        </figure>
        <div class="card-body">
          <div class="flex space-x-4 justify-start items-start">
            <div>
              <img class="w-12 h-12 rounded-full" src="${
                detail.authors[0].profile_picture || ""
              }" alt="Author Image" />
            </div>
            <div>
              <h2 class="card-title">${detail.title || "Default Title"}</h2>
              <div class="flex mt-3">
                <p class="">${
                  detail.authors[0].profile_name || "Author Name"
                }</p>
             ${verifiedBadge}
              </div>
              <p class="mt-3">${detail.others.views || "0"} Views</p>
            </div>
          </div>
        </div>
      </div>
        
        `;
    cardContainer.appendChild(videoContainer);
  });
};

fetchCategories();
fetchDataByCategory(selectedCategory);
