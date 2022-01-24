# ViewerGoogleMapsMark

![](src/assets/aplication-view.gif)

https://rafaelangelo1999.github.io/ViewerGoogleMapsMark/

## Objetivo do projeto

- Mapear no maps algumas coordenados.
- Habilitar e desabilitar o nome do local
- 
## Arquitetura do projeto

Foi desenvolvido uma rotina para utilizar a API do Google para obter as coordenadas passando o endereço como parametro e salvando no banco, foi inserido como constante na aplicação para ser utilizada

API para obter as coordenadas utilizando a API do Google com o endereço

```[HttpGet]
        [Route("Obter Geocalização")]
        [AllowAnonymous]
        public async Task<ActionResult<dynamic>> ObterGeoCalizacaoBanco()
        {
            HttpClient client = new HttpClient();

            var imoveis = _context.IMmovel.Where(x => x.Id != Guid.Empty).ToList();
            foreach (var imovel in imoveis)
            {
                IEnumerable<Address> addresses = await geocoder.GeocodeAsync(imovel.Endereco);
                if (addresses.Count() > 0)
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
