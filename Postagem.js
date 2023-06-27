class Postagem{

    constructor() {
        
    }

    Enviar() {
        this.title = document.getElementById("titulo_postagem").value;
        this.message = document.querySelector('textarea').value;
        this.image = document.getElementById("colocaimag");

        let error_title = document.querySelector(".wrong_title");
        let error_img = document.querySelector(".wrong_img");
        let error_msg = document.querySelector(".wrong_text");
      
        if(this.title.length < 3 || this.title.length > 12) {
           error_title.style.display = "block";
            return;
        }
        else {
            error_title.style.display = 'none';
        }

        if(this.image.files.length === 0) {
            error_img.style.display = "block";
            return;
         }
         else {
            error_img.style.display = 'none';
        }

       if(this.message.length < 10 || this.message.length > 30) {
            error_msg.style.display = "block";
            return;
        }
        else {
            error_msg.style.display = 'none'; 
        }

        const file = this.image.files[0];
        const reader = new FileReader();
    
        reader.addEventListener('load', () => {
            const image_post = reader.result;
    
            this.valoresJSON = localStorage.getItem("valores");
            let valores = [];
    
            if (this.valoresJSON) {
                valores = JSON.parse(this.valoresJSON);
            }
    
            valores.push({
                title: this.title,
                image: image_post,
                message: this.message
            });
    
            localStorage.setItem("valores", JSON.stringify(valores));
            this.exibir();
        });

        reader.readAsDataURL(file);

    }
        
    
    exibir() {

        this.valoresJSON = localStorage.getItem("valores");

        if (this.valoresJSON) {
            let valores = JSON.parse(this.valoresJSON);

            //antes de adicionar um novo, impede que os anteriores se repitam
            let lugar_post = document.getElementById('lugar_post');
            for (var i = lugar_post.children.length - 1; i >= 0; i--) {
                lugar_post.removeChild(lugar_post.children[i]);
            }

            for (var i = 0; i < valores.length; i++) {
                var title_web = valores[i].title;
                var message_web = valores[i].message;
                var image_post = valores[i].image;

                //titulo
                var h3 = document.createElement('h3');
                h3.setAttribute("contenteditable", "true");
                h3.innerHTML = title_web;

                //imagem
                var img = document.createElement('img');
                img.src = image_post;
                var largura = 100;
                img.width = largura;
                img.alt = "Imagem de cada postagem";

                //mensagem 
                var p = document.createElement('p');
                p.setAttribute("contenteditable", "true");
                p.innerHTML = message_web;

                //botao de Editar
                var editar = document.createElement("button");
                editar.addEventListener("click", alterar);
                editar.textContent = "Editar";
                editar.setAttribute("data-index", i);


                //botao de Excluir
                var excluir = document.createElement("button");
                excluir.addEventListener("click", deletar);
                excluir.textContent = "Excluir"; 
                excluir.setAttribute("data-index", i);

                //ERRO
                var error_post_title = document.createElement('span');
                error_post_title.className = 'wrong_title_post';
                error_post_title.textContent = 'Precisa ter entre 3 e 12 caracteres!';

                var error_post_msg = document.createElement('span');
                error_post_msg.className = 'wrong_msg_post';
                error_post_msg.textContent = 'Precisa ter entre 10 e 30 caracteres!';

                //adicionando os elementos acima dentro do div + CSS
                var div = document.createElement('div');
                lugar_post.style.display = "flex";
                lugar_post.style.justifyContent = "center";
                div.style.backgroundColor = "white";
                div.style.width = "25%";
                div.style.border = "3px solid";
                div.style.borderRadius = "30px";
                div.style.margin = "20px";
                h3.style.textAlign = "center";
                h3.style.fontFamily = "Burbank Small, Arial, Helvetica, sans-serif";
                h3.style.border = "1px solid";
                h3.style.borderRadius = "10px";
                p.style.fontFamily = "Burbank Small, Arial, Helvetica, sans-serif";
                p.style.textAlign = "center";
                p.style.border = "1px solid";
                img.style.marginLeft = "90px";
                img.style.borderRadius = "20px";
                editar.style.marginLeft = "80px";
                excluir.style.marginLeft = "30px";
                error_post_title.style.fontFamily = "Burbank Small, Arial, Helvetica, sans-serif";
                error_post_title.style.textAlign = "center";
                error_post_msg.style.fontFamily = "Burbank Small, Arial, Helvetica, sans-serif";
                error_post_msg.style.textAlign = "center";
                error_post_title.style.textAlign = "center";
                
                div.setAttribute("data-postid", i); 
                div.appendChild(h3);
                div.appendChild(error_post_title);
                div.appendChild(img);
                div.appendChild(p);
                div.appendChild(error_post_msg);
                div.appendChild(editar);
                div.appendChild(excluir);
                lugar_post.appendChild(div);

                function alterar(event1){
                    var div = this.parentNode;
                    var indice = event1.target.getAttribute('data-index');
                    //target = armazena uma referência ao elemento em que o evento ocorreu.

                    var novoTitulo = div.querySelector('h3').textContent;
                    var novaMensagem = div.querySelector('p').textContent;

                    let error_title = div.querySelector(".wrong_title_post");
                    let error_msg = div.querySelector(".wrong_msg_post");
      
                    if(novoTitulo.length < 3 || novoTitulo.length > 12) {
                        error_title.style.display = "block";
                        return;
                    }
                    else {
                        error_title.style.display = 'none';
                        valores[indice].title = novoTitulo;
                        localStorage.setItem("valores", JSON.stringify(valores));
                    }
                    
                    if(novaMensagem.length < 10 || novaMensagem.length > 30) {
                        error_msg.style.display = "block";
                        return;
                    }
                    else {
                        error_msg.style.display = 'none'; 
                        valores[indice].message = novaMensagem;
                        localStorage.setItem("valores", JSON.stringify(valores));
                    } 
            
                } 

                function deletar(event2) {
                    var remove_div = event2.target.parentNode;
                    var indice = remove_div.getAttribute("data-index");
                    valores.splice(indice, 1);
                    localStorage.setItem("valores", JSON.stringify(valores));
                  
                    remove_div.remove();
                    atualizar_indices();
                }
                  
                function atualizar_indices() {
                    var lugar_post = document.getElementById("lugar_post");
                    var filhos = lugar_post.children;

                    for (var i = 0; i < filhos.length; i++) {
                        filhos[i].setAttribute("data-index", i);
                    }
                }
            }
        }
    }

    buscar(){
        const searchTerm = document.getElementById("searchInput").value.toLowerCase();
        const lugar_post = document.getElementById("lugar_post");
        const postagens = lugar_post.querySelectorAll("[data-postid]");

        postagens.forEach(function (postagem) {
            const title = postagem.querySelector("h3").textContent.toLowerCase();
            const message = postagem.querySelector("p").textContent.toLowerCase();

            if (title.includes(searchTerm) || message.includes(searchTerm)) {
                postagem.style.display = "block";
            } else {
                postagem.style.display = "none";
            }
        });       
    }

    


}