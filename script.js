const puppyList = document.getElementById('puppies')
let puppyData;
let selection;

async function fetchData(){
    const getInfo = await fetch('https://fsa-puppy-bowl.herokuapp.com/api/2307-FTB-ET-WEB-FT/players');
    const json = await getInfo.json();
    puppyData = json.data.players;
    render()
}

function render(){
// Determines if something is selected or not.
    const hash = window.location.hash.slice(1)*1;
    hash > 0 ? selection = puppyData.find(obj => obj.id === hash) : selection = null;

    if (selection === null){
    const mainPage = puppyData.map(obj => {
        return `
        <div class="box">
            <h1><a href="#${obj.id}">${obj.name}</a></h1>
            <h3>${obj.breed}</h3>
        </div>`
    }).join('');
    puppyList.innerHTML = mainPage;
    }

    if (selection !== null) {
        const selectionHtml = `
            <div class="selection">
                <h3><a href="#">Back to All Puppies</a></h3>
                <div class="currentPuppy">
                    <h1>${selection.name}</h1>
                    <h2>${selection.breed}</h2>
                    <img src="${selection.imageUrl}" alt="">
                </div>
            </div>`
        puppyList.innerHTML = selectionHtml
    }
}


fetchData()


window.addEventListener('hashchange', () => render())
