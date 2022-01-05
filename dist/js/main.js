(()=>{"use strict";const e=document.querySelector(".cards"),t=document.querySelector(".form-select"),n=document.querySelector(".alert"),s=document.querySelector(".logo");let a=[],l=[];const i=t=>{t&&(e.innerHTML="",t.forEach((t=>{e.insertAdjacentHTML("afterbegin",`\n            <div class="card"   >\n                <img src="./db/${t.photo}" class="card-img-top" alt="${t.name}">\n                <div class="card-body">\n                    <h5 class="card-title card-img-overlay text-white">${t.name}</h5>\n                    <p class="card-text">\n                    <span class="badge bg-warning text-dark rounded-pill">birth day:</span>\n                    ${t.birthDay?new Date(t.birthDay.toString()).getFullYear():"unknown"}\n                    </p>\n                    <p class="card-text">\n                    <span class="badge bg-warning text-dark rounded-pill">death day:</span>\n                    ${t.deathDay&&"alive"!==t.status?new Date(t.deathDay.toString()).getFullYear():"-"}\n                    </p>\n                    <ul class="list-group list-group-flush">\n                        <li class="list-group-item">\n                            <span class="font-weight-bold">species:</span>\n                            ${t.species}\n                        </li>\n                        <li class="list-group-item">\n                            <span class="font-weight-bold">gender:</span>\n                            ${t.gender}\n                        </li>\n                        <li class="list-group-item">\n                            <span class="font-weight-bold">status:</span>\n                            ${t.status}\n                        </li>\n                        <li class="list-group-item">\n                            <span class="font-weight-bold">actor:</span>\n                            ${t.actors}\n                        </li>\n                        <li class="list-group-item">\n                            <span class="font-weight-bold">movies:</span>\n                            <small class="text-muted">${t.movies?t.movies.join(", "):""}</small>\n                        </li>\n\n                    </ul>\n                </div>\n            </div>`)})))};t.addEventListener("change",(e=>{const t=e.target.value;let n=a.filter((e=>{if(e.movies&&e.movies.includes(t))return e}));i(n)})),s.addEventListener("click",(e=>{e.preventDefault(),i(a),t.value=t[0].value})),(async()=>await fetch("./db/dbHeroes.json").then((e=>e.json())))().then((e=>(a=e,e))).then((()=>(a.forEach((e=>{e.movies&&e.movies.forEach((e=>{l.includes(e)||l.push(e.trim())}))})),void l.sort().forEach((e=>{const n=document.createElement("option");n.value=e,n.textContent=e,t.append(n)}))))).then((()=>i(a))).catch((e=>{n.textContent="Ошибка запроса...",n.classList.remove("d-none")}))})();