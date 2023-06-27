class Postagem{

    constructor() {
        
    }

    Enviar() {
        this.title = document.getElementById("titulo_postagem").value;
        this.message = document.querySelector('textarea').value;
        this.image = document.getElementById("imagem_postagem");

        let error_title = document.querySelector(".wrong_title");
        let error_img = document.querySelector(".wrong_img");
        let error_msg = document.querySelector(".wrong_text");
        let error_data = document.querySelector(".wrong_data");
      
      
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
                message: this.message,
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
                var largura = 200;
                var altura = 100;
                img.width = largura;
                img.height = altura;
                img.alt = "imagem de cada postagem";

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

                //adicionando os elementos acima dentro do div
                var div = document.createElement('div');
                div.setAttribute("data-postid", i); 
                div.appendChild(h3);
                div.appendChild(error_post_title);
                div.appendChild(img);
                div.appendChild(p);
                div.appendChild(error_post_msg);
                div.appendChild(editar);
                div.appendChild(excluir);
                lugar_post.appendChild(div);

            }
        }
    }
}