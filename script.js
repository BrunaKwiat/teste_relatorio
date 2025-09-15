// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('ano').textContent = new Date().getFullYear();
    
    // Inicializar sistema de upload de fotos
    initUploadSystem();
    
    // Inicializar funcionalidades do formulário
    initFormFunctions();
    
    // Inicializar botões de ação
    initActionButtons();
});

// Sistema de upload de fotos
function initUploadSystem() {
    const fileInput = document.getElementById('fileInput');
    const uploadArea = document.getElementById('uploadArea');
    const imagePreview = document.getElementById('imagePreview');
    
    // Array para armazenar os arquivos selecionados
    window.selectedFiles = [];
    
    // Event listener para quando arquivos são selecionados
    fileInput.addEventListener('change', function(e) {
        handleFiles(e.target.files);
    });
    
    // Event listeners para drag and drop
    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        uploadArea.style.backgroundColor = '#e8f4fc';
        uploadArea.style.borderColor = '#2980b9';
    });
    
    uploadArea.addEventListener('dragleave', function() {
        uploadArea.style.backgroundColor = '#f8fafc';
        uploadArea.style.borderColor = '#3498db';
    });
    
    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        uploadArea.style.backgroundColor = '#f8fafc';
        uploadArea.style.borderColor = '#3498db';
        
        if (e.dataTransfer.files.length) {
            handleFiles(e.dataTransfer.files);
        }
    });
    
    // Função para processar os arquivos selecionados
    window.handleFiles = function(files) {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            
            // Verificar se é uma imagem
            if (!file.type.match('image.*')) {
                alert('Por favor, selecione apenas arquivos de imagem.');
                continue;
            }
            
            // Verificar tamanho do arquivo (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('O arquivo ' + file.name + ' excede o limite de 5MB.');
                continue;
            }
            
            // Adicionar ao array de arquivos selecionados
            window.selectedFiles.push(file);
            
            // Criar pré-visualização
            const reader = new FileReader();
            
            reader.onload = function(e) {
                const previewItem = document.createElement('div');
                previewItem.className = 'preview-item';
                
                const img = document.createElement('img');
                img.src = e.target.result;
                img.alt = file.name;
                
                const removeBtn = document.createElement('button');
                removeBtn.className = 'remove-btn';
                removeBtn.innerHTML = 'X';
                removeBtn.setAttribute('aria-label', 'Remover imagem');
                removeBtn.addEventListener('click', function() {
                    // Remover do array e da visualização
                    const index = window.selectedFiles.indexOf(file);
                    if (index !== -1) {
                        window.selectedFiles.splice(index, 1);
                    }
                    previewItem.remove();
                });
                
                previewItem.appendChild(img);
                previewItem.appendChild(removeBtn);
                imagePreview.appendChild(previewItem);
            };
            
            reader.readAsDataURL(file);
        }
    };
}

// Funcionalidades do formulário
function initFormFunctions() {
    // Adicionar funcionalidade aos botões de adicionar/remover linhas
    document.getElementById('addLinha').addEventListener('click', function() {
        const tbody = document.querySelector('#tabelaProdutos tbody');
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td><input type="text" name="descricao[]" placeholder="Produto" required /></td>
            <td><input type="text" name="lote[]" placeholder="Lote" /></td>
            <td><input type="date" name="data[]" /></td>
            <td><input type="number" name="quantidade[]" min="1" inputmode="numeric" /></td>
            <td><button type="button" class="remover" aria-label="Remover produto">❌</button></td>
        `;
        tbody.appendChild(newRow);
        
        // Adicionar evento ao botão de remover
        newRow.querySelector('.remover').addEventListener('click', function() {
            tbody.removeChild(newRow);
        });
    });
    
    document.getElementById('addEnsaio').addEventListener('click', function() {
        const tbody = document.querySelector('#tabelaEnsaios tbody');
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>
                <select name="ensaio[]" required>
                    <option value="">Selecione...</option>
                    <option value="phi">Pressão hidrostática (PHI)</option>
                    <option value="junta">Pressão hidrostática (junta elástica)</option>
                    <option value="vacuo">Vácuo</option>
                    <option value="dimensional">Dimensional</option>
                    <option value="marcacoes">Marcações</option>
                    <option value="achatamento">Achatamento</option>
                    <option value="calor">Comportamento ao calor</option>
                    <option value="impacto">Resistência ao impacto</option>
                    <option value="estanquiedade">Estanquiedade da junta com anel de vedação elastomérico</option>
                    <option value="mecanica">Resistência mecânica ou flexibilidade</option>
                </select>
            </td>
            <td>
                <select name="amostras[]" required>
                    <option value="">Selecione...</option>
                    <option>01</option><option>02</option><option>03</option><option>04</option>
                    <option>05</option><option>06</option><option>07</option><option>08</option>
                    <option>09</option><option>10</option><option>11</option><option>12</option>
                    <option>13</option><option>14</option><option>15</option><option>20</option>
                    <option>32</option><option>50</option><option>80</option><option>125</option>
                </select>
            </td>
            <td>
                <select name="metodo[]" required>
                    <option value="">Selecione...</option>
                    <option value="0.5k15">0,5 Kgf/cm² × 15 min</option>
                    <option value="2k15">2 Kgf/cm² × 15 min</option>
                    <option value="-0.3b15">-0,3 Bar × 15 min</option>
                    <option value="gabarito">Gabarito</option>
                    <option value="visual">Visual</option>
                    <option value="deflexao30">Deflexão de (X) 30%</option>
                    <option value="150c30">150º ± 2º × 30 min</option>
                    <option value="deflexao_ponta">Deflexão da ponta ≥10%</option>
                    <option value="deflexao_bolsa">Deflexão da bolsa ≥5%</option>
                    <option value="diferenca5">Diferença ≥5%</option>
                    <option value="ang_dn_le_315">Deflexão angular (dn ≤ 315 mm) 2º</option>
                    <option value="ang_315_lt_dn_le_630">Deflexão angular (315 mm &lt; dn ≤ 630 mm) 1,5º</option>
                    <option value="ang_dn_gt_630">Deflexão angular (dn &gt; 630 mm) 1º</option>
                </select>
            </td>
            <td>
                <select name="resultado[]" required>
                    <option value="">Selecione...</option>
                    <option value="aprovado">Aprovado</option>
                    <option value="reprovado">Reprovado</option>
                </select>
            </td>
            <td><button type="button" class="remover" aria-label="Remover ensaio">❌</button></td>
        `;
        tbody.appendChild(newRow);
        
        // Adicionar evento ao botão de remover
        newRow.querySelector('.remover').addEventListener('click', function() {
            tbody.removeChild(newRow);
        });
    });
    
    // Adicionar eventos aos botões de remover existentes
    document.querySelectorAll('.remover').forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            row.parentNode.removeChild(row);
        });
    });
}

// Botões de ação
function initActionButtons() {
    // Funcionalidade básica para os botões de ação
    document.getElementById('btnSalvar').addEventListener('click', function() {
        // Coletar dados do formulário
        const formData = new FormData(document.getElementById('formRelatorio'));
        
        // Adicionar informações sobre as fotos
        const fotoInfo = window.selectedFiles.map(file => ({
            name: file.name,
            size: file.size,
            type: file.type
        }));
        
        // Converter para JSON e salvar no localStorage
        const relatorioData = {
            identificacao: {
                ordemProducao: formData.get('ordemProducao'),
                dataRelatorio: formData.get('dataRelatorio')
            },
            produtos: [],
            ensaios: [],
            fotos: fotoInfo,
            nbr: formData.getAll('nbr[]')
        };
        
        // Coletar produtos
        const descricoes = formData.getAll('descricao[]');
        const lotes = formData.getAll('lote[]');
        const datas = formData.getAll('data[]');
        const quantidades = formData.getAll('quantidade[]');
        
        for (let i = 0; i < descricoes.length; i++) {
            if (descricoes[i]) {
                relatorioData.produtos.push({
                    descricao: descricoes[i],
                    lote: lotes[i] || '',
                    data: datas[i] || '',
                    quantidade: quantidades[i] || ''
                });
            }
        }
        
        // Coletar ensaios
        const ensaios = formData.getAll('ensaio[]');
        const amostras = formData.getAll('amostras[]');
        const metodos = formData.getAll('metodo[]');
        const resultados = formData.getAll('resultado[]');
        
        for (let i = 0; i < ensaios.length; i++) {
            if (ensaios[i]) {
                relatorioData.ensaios.push({
                    ensaio: ensaios[i],
                    amostras: amostras[i] || '',
                    metodo: metodos[i] || '',
                    resultado: resultados[i] || ''
                });
            }
        }
        
        // Gerar ID único para o relatório
        const relatorioId = 'relatorio_' + new Date().getTime();
        
        // Salvar no localStorage
        localStorage.setItem(relatorioId, JSON.stringify(relatorioData));
        
        alert('Relatório salvo com sucesso! ID: ' + relatorioId);
    });
    
    document.getElementById('btnPDF').addEventListener('click', function() {
        alert('Funcionalidade de gerar PDF será implementada aqui.');
    });
    
    document.getElementById('btnImprimir').addEventListener('click', function() {
        window.print();
    });
    
    document.getElementById('btnTemas').addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'claro' ? 'escuro' : 'claro';
        document.documentElement.setAttribute('data-theme', newTheme);
        this.textContent = newTheme === 'claro' ? 'Tema Escuro' : 'Tema Claro';
        
        // Alterar cores do tema
        if (newTheme === 'escuro') {
            document.documentElement.style.setProperty('--bg-color', '#333');
            document.documentElement.style.setProperty('--text-color', '#fff');
            document.documentElement.style.setProperty('--field-bg', '#444');
        } else {
            document.documentElement.style.setProperty('--bg-color', '#f5f5f5');
            document.documentElement.style.setProperty('--text-color', '#333');
            document.documentElement.style.setProperty('--field-bg', '#fff');
        }
    });
}