

/*  Select My Search bar and my div that will show the result list   */

const search = document.getElementById("search"); 
const matchList = document.getElementById("match-list");

/*  Select My API URL */
const url = "https://donnees.grandchambery.fr/api/records/1.0/search/?dataset=accueils-loisirs-pour-les-317-ans-a-chambery"; 


/*  Set an image array that I'll add later to my JSON file */
let imageArr = [
"https://www.mjc-chambery.com/images_articles/42bec15675e7b310660f34e7621cb934.jpg",
"https://www.sport-savoie.fr/images/divers/2017/FETESPORTBIOLLAY/IMG_5484BIS.jpg",
'https://www.sport-savoie.fr/images/divers/2017/FETESPORTBIOLLAY/FS-nad-55BIS.jpg',
'https://www.chambery.fr/uploads/Diaporama/75/IMF_DIAPORAMA/GAB_PORTAIL/6677_327__DSC_7540.jpg',
'https://www.maison-de-lenfance-chantemerle.net/s/cc_images/cache_2478120631.jpg',
'http://www.csccombes.com/CENTRE%20SOCIAL%20et%20CULTUREL%20des%20COMBES/album/F%C3%8ATE%20DE%20QUARTIER%202015/slides/1.jpg',
'https://www.chambery.fr/uploads/Image/0f/IMF_100/GAB_PORTAIL/6569_576_bandeau-gymnase-enfants.jpg',
'https://www.sport-savoie.fr/images/divers/2017/FETESPORTBIOLLAY/FS-nad-34BIS.jpg',
'http://chambery-savoie.com/uploads/images_thumbs/18/18d12b6d.jpg',
'https://www.chambery.fr/uploads/Image/41/IMF_100/GAB_PORTAIL/4237_450_Hip-Hop-a-la-MJC.jpg',
'https://www.mairie-labouexiere.fr/wp-content/uploads/sites/4/2019/08/escapade-de-pr%C3%A8s-942x630.jpg',
'https://img.aws.la-croix.com/2018/01/05/1200903746/petits-alternent-atelier-deveil-travail-scolaire-aides-professeurs_3_1399_932.jpg',
'https://www.harris73.com/medias/images/h73-imgweb099.jpg',
'https://france3-regions.francetvinfo.fr/auvergne-rhone-alpes/sites/regions_france3/files/styles/top_big/public/assets/images/2019/05/22/60756821_2680557222019289_348619763817119744_o-4249993.jpg?itok=fRqZ9ZOC',
'https://www.sport-savoie.fr/images/divers/2017/FETESPORTBIOLLAY/IMG_5387BIS.jpg',
'https://www.sport-savoie.fr/images/divers/2017/FETESPORTBIOLLAY/IMG_5375BIS.jpg',
'https://www.sport-savoie.fr/images/divers/2017/FETESPORTBIOLLAY/20170917_152053BIS.jpg',
'https://www.sport-savoie.fr/images/divers/2017/FETESPORTBIOLLAY/FS-nad-62BIS.jpg',
'https://www.sport-savoie.fr/images/divers/2017/FETESPORTBIOLLAY/IMG_5391BIS.jpg',
'https://www.sport-savoie.fr/images/divers/2017/FETESPORTBIOLLAY/FS-nad-31BIS.jpg',
'https://www.sport-savoie.fr/images/divers/2017/FETESPORTBIOLLAY/FS-nad-55BIS.jpg'
]; 


let communes; 


let communesStorage = window.localStorage; 

fetch("https://donnees.grandchambery.fr/api/records/1.0/search/?dataset=accueils-loisirs-pour-les-317-ans-a-chambery&rows=20&facet=type&facet=commune&facet=quartier&facet=public&location=")
.then(res => res.json())
.then(data => {

    communes = data;

    search.addEventListener('input', () => findCommunes(search.value, communes));

    communes.records.map((x,i) => {
        x.fields["images"] = imageArr[i]; 
    
    })

    communesStorage.setItem("centres",JSON.stringify(communes)); 
    console.log(communesStorage);
});


// Here is the local storage.
const centreStorage = JSON.parse(communesStorage.getItem("centres")); 

function findCommunes(input, quartier) {
    let matches = quartier.records.filter((x,i) =>  {
    return x.fields['quartier'].toLowerCase().includes(input.toLowerCase());    
});

    if(input.length === 0) {
        matches = [];
        matches.innerHTML = '';  
    }
    outPutHtml(matches);
    // const list = document.querySelectorAll(".card"); 

}

let string ="Voir sur la carte"; 
function outPutHtml(html) {
    matchList.innerHTML = html.map(x => `
    <div class="card" style="margin-top=10px;" data-id="${x.recordid}">
            <div class="row">
                <div class="col-md-4">
                    <img class="img-thumbnail"  src=${x.fields["images"]}>
                </div>       
                <div class="col-md-8 px-3">
                    <div class="card-block px-3">

                        <h2 class="card-title">${x.fields["nom_structure"]} </h2>
                        <h3 class="subtitle">${x.fields["quartier"]} </h3>
                        <p class="card-text">${x.fields["accueil_horaires"]}
                        ${x.fields["adresse"]} </p>
                        <button class="card-btn"> <a href="./carte.html?recordid=${x.recordid}"> ${string} </a></button>
                    </div>
                </div>
            </div>
        
    </div>`).join('');

}
    






