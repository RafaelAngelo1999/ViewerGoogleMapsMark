# 📍 ViewerGoogleMapsMark

![](src/assets/aplication-view.gif)

🔗 [Acesse o projeto aqui](https://rafaelangelo1999.github.io/ViewerGoogleMapsMark/)

---

## 🎯 Objetivo do Projeto

- Visualizar diferentes localizações utilizando o Google Maps.
- Mapear coordenadas (latitude e longitude) a partir de endereços.
- Permitir habilitar e desabilitar a exibição dos nomes dos locais no mapa.

---

## 🏩 Arquitetura do Projeto

O projeto foi desenvolvido utilizando a **API do Google Maps** para converter endereços em coordenadas geográficas, armazenando os resultados no banco de dados. Posteriormente, essas informações são utilizadas diretamente na aplicação, como constantes.

### 🔥 Funcionalidades principais:

- Integração com a API do Google para geocodificação (endereços → coordenadas).
- Salvamento das coordenadas em banco de dados.
- Exibição de marcadores (markers) no mapa de forma dinâmica.

---

## 🛠️ Exemplo de Rotina para Obter Geolocalização

```csharp
[HttpGet]
[Route("Obter Geolocalização")]
[AllowAnonymous]
public async Task<ActionResult<dynamic>> ObterGeoCalizacaoBanco()
{
    HttpClient client = new HttpClient();

    var imoveis = _context.IMmovel.Where(x => x.Id != Guid.Empty).ToList();
    foreach (var imovel in imoveis)
    {
        IEnumerable<Address> addresses = await geocoder.GeocodeAsync(imovel.Endereco);
        if (addresses.Any())
        {
            imovel.Lat = addresses.First().Coordinates.Latitude;
            imovel.lng = addresses.First().Coordinates.Longitude;

            _context.Entry(imovel).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
    }
    return new { imoveis };
}
```

---

## 🚀 Tecnologias Utilizadas

- ReactJS (Create React App)
- Google Maps API
- .NET Core (API para geolocalização)
- Entity Framework Core
- JavaScript / TypeScript
- HTML5 + CSS3

---

## 💬 Observações

- É necessário possuir uma **chave de API do Google Maps** válida para utilizar a funcionalidade de geocodificação.
- Algumas limitações podem existir dependendo da política de uso gratuita da API do Google.

---

## 🤝 Contribuições

Sinta-se à vontade para abrir **Issues**, enviar **Pull Requests** ou sugerir novas funcionalidades! 🚀
