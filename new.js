async function start (){
    const response = await fetch("https://dog.ceo/api/breeds/list/all")
    const data = await response.json()
      creatBreadList(data.message)  
}


start()


function creatBreadList(BreedList){
    document.getElementById("breed").innerHTML = `
    <select onchange="loadByBreed(this.value)">
            <option>Choose a Dog Breed</option>
            ${Object.keys(BreedList).map(function (breed){
            return`<option>${breed}</option>`
            }).join('')}
        </select>
    `
}


async function loadByBreed(breed) {
    if (breed != "Choose a Dog Breed"){
        const response = await fetch(` https://dog.ceo/api/breed/${breed}/images`)
        const data = await response.json()
        console.log(data)
        createSlideShow(data.message)
    }
}


function createSlideShow(images){
    let currentPosition = 0
   document.getElementById("slideShow").innerHTML= `
   <div class="slide" style="background-image: url('${images[0]}');"></div>
   <div class="slide" style="background-image: url('${images[1]}');"></div>
   `
   currentPosition += 2
   setInterval(nextSlide, 3000)
   function nextSlide(){
    document.getElementById("slideShow"). insertAdjacentHTML("beforeend", `<div class="slide" style="background-image: url('${images[currentPosition]}');"></div>`)
    setTimeout(function () {
        document.querySelector(".slide"). remove()
    }, 1000)
    if(currentPosition + 1 >= images.length) {
        currentPosition = 0
    } else{
        currentPosition++
    }
   }
}

