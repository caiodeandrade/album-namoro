# album-namoro

Site estático com scroll interativo para celebrar 4 anos de namoro.

## Editar os textos

Todo o conteúdo (título, nomes, data e a mensagem de cada foto) fica em [`data/content.js`](data/content.js). Basta abrir o arquivo e substituir os textos entre colchetes, ex.: `[Nome dela]`.

As fotos já estão em `assets/photos/01.jpg` a `14.jpg`, na ordem cronológica original.

## Rodar localmente

Não há build. Basta servir a pasta com qualquer servidor estático, por exemplo:

```
python3 -m http.server
```

E abrir `http://localhost:8000`.

## Publicar

O deploy é automático via GitHub Actions a cada push na branch `master` (veja `.github/workflows/deploy.yml`). Depois do primeiro push, ative em **Settings → Pages → Source: GitHub Actions**.
