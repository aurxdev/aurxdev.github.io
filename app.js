AOS.init();

let creations = document.getElementById('creations');

let titre = ['<i class="bi bi-filetype-html"></i> 2BAT Construction', '<i class="bi bi-filetype-html"></i> Valalaprod', '<i class="bi bi-filetype-py"></i> Jeu de la vie', '<i class="bi bi-filetype-py"></i> Tetris'];
let image = ['2bat.png', 'valou.png', 'jeuVie.gif','tetris.png'];
let desc = ['Site web pour une entreprise qui effectue des travaux de gros oeuvres.', 'Site web pour un beatmaker.', 'Simulation du jeu de la vie.', 'Tetris développé en Python.']
let tabDiv = []

let maxDiv = 4;


function init(j,max){

    creations.innerHTML = '';
    if(j>0){
        if(document.body.offsetWidth >= 800){
            creations.style.gridTemplateColumns = '.5fr 1fr 1fr';
            let div3 = document.createElement('div');
            div3.classList.add('iconDiv');
            let icon = document.createElement('i');
            icon.addEventListener("click", init.bind(null, j-2,max-2), false);
            icon.classList.add('bi','bi-arrow-left','icon');
            icon.style.left = '30%';
            icon.setAttribute('data-aos','fade-left');
            div3.appendChild(icon);
            creations.appendChild(div3);
        }

    }

    

    for(i=j; i<max;i++){
        let div = document.createElement('div');
        div.classList.add('card');
        div.setAttribute('data-aos','fade-left');
        div.setAttribute('data-aos-duration', i*200+300);
        let h2 = document.createElement('h2');
        h2.innerHTML = titre[i];
        let img = document.createElement('img');
        img.src = image[i];
        img.classList.add('responsive');
        let p = document.createElement('p');
        p.textContent = desc[i];
        div.appendChild(h2);
        div.appendChild(img);
        div.appendChild(p);
        creations.appendChild(div);

    }

    if(j>0 && document.body.offsetWidth < 800){
            let div4 = document.createElement('div');
            div4.classList.add('iconDivMobile');
            let btn = document.createElement('button');
            btn.addEventListener("click", init.bind(null, j-2,max-2), false);
            let icon = document.createElement('i');
            icon.setAttribute('data-aos','fade-left');
            icon.classList.add('bi','bi-arrow-left')
            btn.appendChild(icon);
            div4.appendChild(btn);
            creations.appendChild(div4);
    
    }
   
    if(max < maxDiv){
        if(document.body.offsetWidth >= 800){
            creations.style.gridTemplateColumns = '1fr 1fr 0.5fr';
            let div2 = document.createElement('div');
            div2.classList.add('iconDiv');
            let icon = document.createElement('i');
            icon.addEventListener("click", init.bind(null, j+2,max+2), false);
            icon.classList.add('bi','bi-arrow-right','icon');
            icon.setAttribute('data-aos','fade-left');
            div2.appendChild(icon);
            creations.appendChild(div2);
        }
        else{

            let div5 = document.createElement('div');
            div5.classList.add('iconDivMobile');
            let btn = document.createElement('button');
            btn.addEventListener("click", init.bind(null, j+2,max+2), false);
            let icon = document.createElement('i');
            icon.classList.add('bi','bi-arrow-right')
            icon.setAttribute('data-aos','fade-left');
            btn.appendChild(icon);
            div5.appendChild(btn);
            creations.appendChild(div5);

        }
    }
    if(j>0 && max < maxDiv){
        creations.style.gridTemplateColumns = '.3fr 1fr 1fr .3fr';
    }
    
}

init(0,2);