
const textoElemento = document.getElementById('texto-versiculo');
const referenciaElemento = document.getElementById('referencia-versiculo');
const botaoElemento = document.getElementById('btn-novo-versiculo');
const btnCopiarElemento = document.getElementById('btn-copiar');

async function obterVersiculo() {
    try {
        // Fade-out: Desaparece o texto antigo
        textoElemento.classList.add('fade-out');
        referenciaElemento.classList.add('fade-out');
        
        // Aguarda a transição
        await new Promise(resolve => setTimeout(resolve, 500));

        textoElemento.innerText = "Buscando uma palavra para você...";
        referenciaElemento.innerText = "";
        
        // Remove a classe fade-out para aparecer o novo texto
        textoElemento.classList.remove('fade-out');
        referenciaElemento.classList.remove('fade-out');

        const resposta = await fetch('https://bible-api.com/?random=verse&translation=almeida');
        
        const dados = await resposta.json();

        // Fade-out novamente antes de atualizar
        textoElemento.classList.add('fade-out');
        referenciaElemento.classList.add('fade-out');
        
        await new Promise(resolve => setTimeout(resolve, 500));
        
        textoElemento.innerText = `"${dados.text.trim()}"`;
        referenciaElemento.innerText = dados.reference;
        
        // Fade-in: Aparece o texto novo
        textoElemento.classList.remove('fade-out');
        referenciaElemento.classList.remove('fade-out');

    } catch (erro) {
        textoElemento.innerText = "Ops! Não consegui carregar o versículo. Verifique sua conexão.";
        console.error("Erro ao buscar versículo:", erro);
    }
}

// Função para copiar o versículo
function copiarVersiculo() {
    const texto = textoElemento.innerText;
    const referencia = referenciaElemento.innerText;
    const textoCopiar = `${texto}\n${referencia}`;
    
    navigator.clipboard.writeText(textoCopiar).then(() => {
        // Feedback visual: mudar o ícone temporariamente
        const svg = btnCopiarElemento.querySelector('svg');
        const htmlOriginal = svg.parentElement.innerHTML;
        
        btnCopiarElemento.innerHTML = '✓ Copiado!';
        btnCopiarElemento.style.color = '#27ae60';
        
        setTimeout(() => {
            btnCopiarElemento.innerHTML = htmlOriginal;
            btnCopiarElemento.style.color = '#543d36';
        }, 2000);
    }).catch(() => {
        alert('Erro ao copiar o versículo');
    });
}

botaoElemento.addEventListener('click', obterVersiculo);
btnCopiarElemento.addEventListener('click', copiarVersiculo);

obterVersiculo();