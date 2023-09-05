const loadPhone = async (searchText='a', isShowAll) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) =>{

    // console.log(phones);
    // get element --1
    const phoneContainer = document.getElementById('phone-container');

    // clear phone container before adding new cards
    phoneContainer.textContent='';

    // display show all button if there are more than twelve phones
    const showAllContainer = document.getElementById('show-all-container');

    // show alll hidden
    if(phones.length>12 && !isShowAll ){
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden');
    }


    // display only first twelve phones
    if(!isShowAll){
        phones = phones.slice(0,12);
    } 

    // display show less
    const showLessContainer = document.getElementById('show-less-container');


    // show Less hidden
    if(phones.length<13 && !isShowAll){
        showLessContainer.classList.add('hidden');
    }
    else{
        showLessContainer.classList.remove('hidden');
    }
    

    phones.forEach(phone =>{
        // creat a div--2
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-grey-100 p-4 shadow-xl`;
        // set html--3
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" /></figure>
        <div class="card-body">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p>${phone.slug}</p>
        <div class="card-actions justify-center">
        <button onclick="handleSowDetail('${phone.slug}')" class="btn btn-primary">Show details</button>
        </div>
        </div>
        `
        // apendchild--4
        phoneContainer.appendChild(phoneCard);
    });
    
    // console.log(phone);
    // hide loading spinner
    toggleLoadingSpinner(false);
}

// handle show less
const handleShowLess = () =>{
    phones = phones.slice(0,12);
}


// hamdle seatch button
const handleSearch = (isShowAll) =>{
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText) ;
    loadPhone(searchText, isShowAll);
}

// loading animation
const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    } 
    else{
        loadingSpinner.classList.add('hidden');
    }
}

// 
const handleSowDetail = async(id) =>{
    // console.log('hi', id);
    // load sigle phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    // console.log(data); 
    showPhoneDetails(phone);
}

const showPhoneDetails =(phone)=>{

    // detaisls
    const phoneName = document.getElementById('phone-name');
    phoneName.innerText= phone.name;

    const showdetailContainer = document.getElementById('show-detail-container');
    showdetailContainer.innerHTML =`
    <img src="${phone.image}"/>
    <p><span>Storage:</span></p>
    `
    // show modal
    show_details.showModal();
}




// handle show all
const handleShowAll = () =>{
    handleSearch(true);
}


loadPhone()