//Data
const data = [
    {
        name:"Get Started",
        content:[
            {
                name:"Hello World",
                filename:"get_started/hello_world.html"
            }
        ]
    },
    {
        name:"STD - Standard",
        content:[
            {
                name:"puts",
                type:"function",
                filename:"std/puts.html"
            },
            {
                name:"gets",
                type:"function",
                filename:"std/gets.html"
            },
            {
                name:"range",
                type:"function",
                filename:"std/range.html"
            },
            {
                name:"int",
                type:"class",
                filename:"std/int.html"
            },
            {
                name:"float",
                type:"class",
                filename:"std/float.html"
            },
            {
                name:"str",
                type:"class",
                filename:"std/str.html"
            },
            {
                name:"bool",
                type:"class",
                filename:"std/bool.html"
            },
            {
                name:"list",
                type:"class",
                filename:"std/list.html"
            },
            {
                name:"map",
                type:"class",
                filename:"std/map.html"
            }
        ]
    }
]

//Variables
const app_logo = document.getElementById('app_logo');
const r = document.querySelector(':root');
const content = document.getElementById('content');
const header_links = document.getElementById("header_links");
const nav_content = document.getElementById('nav_content');
const nav_title = document.getElementById('nav_title');
const landing_page = document.getElementById('landing_page');
const page_body = document.getElementById('body');
const searchbar = document.getElementById('searchbar');
const searchbar_input = document.getElementById('searchbar_input');
const searchbar_btn = document.getElementById('searchbar_btn');
const color_mode_transition = document.getElementById('color_mode_transition');

//Load data
while (header_links.firstChild){
    header_links.removeChild(header_links.firstChild);
}
data.forEach(categorie=>{

    //Add title
    let header_link = document.createElement('p');
    header_link.textContent = categorie.name;
    header_links.appendChild(header_link);

    //On click
    header_link.addEventListener('click', ()=>{

        loadCategorie(categorie);

    });

});

//Load categorie
function loadCategorie(categorie){

    //Landing page
    landing_page.style.display = 'none';
    page_body.style.display = 'flex';

    //Remove old nav
    while (nav_content.firstChild){
        nav_content.removeChild(nav_content.firstChild);
    }

    //Change name
    nav_title.textContent = categorie.name;

    //New nav
    categorie.content.forEach(subcategorie=>{
        
        //Add typeicon
        let typeicon;
        if (subcategorie.type){
            typeicon = document.createElement('p');
            typeicon.className = "typeicon-" + subcategorie.type;
        }

        //Add title
        let nav_link = document.createElement('span');
        nav_link.textContent = subcategorie.name;
        if (subcategorie.type)
            nav_link.insertBefore(typeicon, nav_link.firstChild);
        nav_content.appendChild(nav_link);

        //On click
        nav_link.addEventListener('click', ()=>{

            //Remove all select
            for (let i = 0; i < nav_content.children.length; i++) {
                nav_content.children[i].classList.remove('nav-link-selected');
            }

            //Select current link
            nav_link.classList.add('nav-link-selected');

            //Load file
            loadContent(subcategorie.filename);

        });

    });

}

//Content
let itervalID = undefined;
function loadContent(filename){

    let xhttp;

    if (filename){

        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = ()=>{
            if (xhttp.readyState == 4){
                if (itervalID){
                    clearInterval(itervalID);
                }
                if (xhttp.status == 200) {
                
                    content.innerHTML = xhttp.responseText;
                
                }
                if (xhttp.status == 404) {
                    
                    content.innerHTML = '';
                    let dvd = document.createElement('h1');
                    dvd.textContent = "Page not found";
                    dvd.className = "dvd-play";
                    content.appendChild(dvd);
                    
                    dvd.addEventListener('click', ()=>{
                        
                        let top = 0, left = 0;
                        let velocityX = 2, velocityY = 2;
    
                        itervalID = setInterval(()=>{
                            dvd.style.top = top.toString() + "px";
                            dvd.style.left = left.toString() + "px";
                            left += velocityX;
                            top += velocityY;
                            let canva = content;
                            canva = body
                            if (top + dvd.offsetHeight >= canva.offsetHeight){
                                velocityY = -velocityY;
                            }
                            if (left + dvd.offsetWidth >= canva.offsetWidth){
                                velocityX = -velocityX;
                            }
                            if (top <= 0){
                                velocityY = -velocityY;
                            }
                            if (left <= 0){
                                velocityX = -velocityX;
                            }
    
                        }, 1);

                    });

                }
                content.focus();
            }
        }
        xhttp.open('GET', 'templates/' + filename + ".html", true)
        xhttp.send();
        return;

    }
    
}

//Load first page
if (header_links.firstChild){
    header_links.firstChild.click();
    if (nav_content.firstChild)
        nav_content.firstChild.click();
}

//Darkmode
function darkmode(){
    color_mode_transition.classList.add('color-mode-transition-show-animation');
    color_mode_transition.hidden = false;
    setTimeout(()=>{

        r.style.setProperty('--cBackground', '#1F2125');
        r.style.setProperty('--cBackground2', '#292B2F');
        r.style.setProperty('--cBorder', '#353638');
        r.style.setProperty('--cFont', '#FFFFFF');
        r.style.setProperty('--cFont2', '#AAADB6');
        
        app_logo.src = "images/Logo_white.png";

        color_mode_transition.classList.remove('color-mode-transition-show-animation');
        color_mode_transition.classList.add('color-mode-transition-hide-animation');
        setTimeout(() => {
            color_mode_transition.classList.remove('color-mode-transition-hide-animation');
            color_mode_transition.hidden = true;
        }, 500);
    
    }, 500);
}

//Lightmode
function lightmode(){
    color_mode_transition.classList.add('color-mode-transition-show-animation');
    color_mode_transition.hidden = false;
    setTimeout(()=>{
        
        r.style.setProperty('--cBackground', '#FFFFFF');
        r.style.setProperty('--cBackground2', 'rgb(245, 245, 245)');
        r.style.setProperty('--cBorder', 'rgb(225, 225, 225)');
        r.style.setProperty('--cFont', '#000000');
        r.style.setProperty('--cFont2', 'rgb(20, 20, 20)');
        
        app_logo.src = "images/logo.png";

        color_mode_transition.classList.remove('color-mode-transition-show-animation');
        color_mode_transition.classList.add('color-mode-transition-hide-animation');
        setTimeout(() => {
            color_mode_transition.classList.remove('color-mode-transition-hide-animation');
            color_mode_transition.hidden = true;
        }, 500);
    
    }, 500);
}


//Open search bar
document.addEventListener('keydown', (event)=>{
    if (["/", " "].includes(event.key) && !searchbar.classList.contains('searchbar-showed')){
        searchbar.classList.add('searchbar-showed');
        searchbar_input.focus();
        searchbar_input.value = "";
        event.preventDefault();
    }
});

//Close search bar
searchbar_input.addEventListener('keyup', (event)=>{
    if (event.key === "Escape"){
        searchbar.classList.remove('searchbar-showed');
        content.focus();
    } else if (event.key === "Enter"){
        searchbar_btn.click();
    }
})
function close_searchbar(){
    searchbar.classList.remove('searchbar-showed');
    content.focus();
}

//Search
searchbar_btn.addEventListener('click', ()=>{

    if (searchbar_input.value == "lightmode"){

        //Lightmode
        lightmode();
        close_searchbar();

    } else if (searchbar_input.value == "darkmode"){
        
        //Darkmode
        darkmode();
        close_searchbar();

    } else {
        
        //Search
        let search = searchbar_input.value.toLowerCase();
        data.forEach(categorie=>{
            
            //Categorie
            if (categorie.name.toLowerCase().includes(search)){
                loadCategorie(categorie);
                close_searchbar();
                if (nav_content.firstChild)
                    nav_content.firstChild.click();
                return;
            }

            //Subcategorie
            categorie.content.forEach(subcategorie=>{
                
                if (subcategorie.name.toLowerCase().includes(search)){
                    loadCategorie(categorie);
                    for (let i = 0; i < nav_content.children.length; i++) {
                        if (nav_content.children[i].textContent.toLowerCase().includes(search)){
                            nav_content.children[i].click();
                            close_searchbar();
                            return;
                        }
                    }
                }

            });

        });

        //No result
        searchbar_input.classList.add('searchbar-input-error');
        setTimeout(() => {
            searchbar_input.classList.remove('searchbar-input-error');
        }, 1000);

    }

});