# Monopoly web project group 28

## Parent group
https://git.ti.howest.be/TI/2021-2022/s2/programming-project/projects/group-28

## Remote urls
### Your own project
* https://project-i.ti.howest.be/monopoly-28/
* https://project-i.ti.howest.be/monopoly-28/api/

### Provided API
* https://project-i.ti.howest.be/monopoly-api-spec/


## Please complete the following before committing the final version on the project
Please **add** any **instructions** required to
* Make your application work if applicable
* Be able to test the application (login data)
* View the wireframes

Also clarify
* If there are known **bugs**
* If you haven't managed to finish certain required functionality

## Functionality table

|PRIORITY|ENDPOINT                                                                                                |Client                | Client          |Server                       | Server                      | Explenation                 |
|--------|--------------------------------------------------------------------------------------------------------|----------------------|-----------------|-----------------------------|-----------------------------|-----------------------------|
|        |                                                                                                        |Visualize ( HTML/CSS) |Consume API (JS) |Process request (API-Bridge) |Implement Game Rules (logic)||
|        |**General Game and API Info**                                                                           |100%                  |YES/NO           |YES/NO                       |100%                         ||
|        |GET /                                                                                                   |100%                  |YES              |YES                          |100%                         ||
|MUSTHAVE|GET /tiles                                                                                              |100%                  |YES              |YES                          |100%                         ||
|MUSTHAVE|GET /tiles /{tileId}                                                                                    |100%                  |YES              |YES                          |100%                         ||
|        |GET /chance                                                                                             |100%                  |YES              |YES                          |100%                         ||
|        |GET /community-chest                                                                                    |100%                  |YES              |YES                          |100%                         ||
|        |                                                                                                        |                      |                 |                             |                             ||
|        |**Managing Games**                                                                                      |                      |                 |                             |                             ||
|        |DELETE /games                                                                                           |0%                    |NO               |NO                           |0%                           ||
|MUSTHAVE|GET /games                                                                                              |100%                  |YES              |YES                          |100%                         ||
|        |Additional requirement: with filters                                                                    |100%                  |YES              |YES                          |100*                         ||
|MUSTHAVE|POST /games                                                                                             |100%                  |YES              |YES                          |100%                         ||
|MUSTHAVE|POST /games /{gameId} /players                                                                          |100%                  |YES              |YES                          |100%                         ||
|        |                                                                                                        |                      |                 |                             |                             ||
|        |Info                                                                                                    |                      |                 |                             |                             ||
|        |GET /games /dummy                                                                                       |0%                    |NO               |NO                           |0%                           ||
|MUSTHAVE|GET /games /{gameId}                                                                                    |100%                  |YES              |YES                          |100%                         ||
|        |                                                                                                        |                      |                 |                             |                             ||
|        |**Turn Management**                                                                                     |                      |                 |                             |                             ||
|MUSTHAVE|POST /games /{gameId} /players /{playerName} /dice                                                      |100%                  |YES              |YES                          |100%                         ||
|        |With jail                                                                                               |100%                  |YES              |YES                          |100%                         ||
|MUSTHAVE|POST /games /{gameId} /players /{playerName} /bankruptcy                                                |100%                  |YES              |YES                          |60%                          |De uitleg kan je vinden in de README van de server (bugs)|
|        |Decent distribution of assets                                                                           |0%                    |NO               |YES                          |50%                          |De properties worden niet uitgedeeld aan de ander spelers, alles gaat terug naar de bank|
|        |                                                                                                        |                      |                 |                             |                             ||
|        |**Tax Management**                                                                                      |                      |                 |                             |                             ||
|        |POST /games /{gameId} /players /{playerName} /tax /estimate                                             |0%                    |NO               |NO                           |0%                           ||
|        |POST /games /{gameId} /players /{playerName} /tax /compute                                              |0%                    |NO               |NO                           |0%                           ||
|        |                                                                                                        |                      |                 |                             |                             ||
|        |**Buying property**                                                                                     |                      |                 |                             |                             ||
|MUSTHAVE|POST /games /{gameId} /players /{playerName} /properties /{propertyName}                                |100%                  |YES              |YES                          |100%                         ||
|MUSTHAVE|DELETE /games /{gameId} /players /{playerName} /properties /{propertyName}                              |100%                  |YES              |YES                          |100%                         ||
|        |With 1 bank auction                                                                                     |0%                    |NO               |NO                           |0%                           ||
|        |                                                                                                        |                      |                 |                             |                             ||
|        |**Improving property**                                                                                  |                      |                 |                             |                             | Er wordt geen rekening gehouden met available houses/hotels. De functie is niet geïmplementeerd. |
|        |POST /games /{gameId} /players /{playerName} /properties /{propertyName} /houses                        |80%                   |YES              |YES                          |80%                          ||
|        |DELETE /games /{gameId} /players /{playerName} /properties /{propertyName} /houses                      |80%                   |YES              |YES                          |80%                          ||
|        |POST /games /{gameId} /players /{playerName} /properties /{propertyName} /hotel                         |80%                   |YES              |YES                          |80%                          ||
|        |DELETE /games /{gameId} /players /{playerName} /properties /{propertyName} /hotel                       |80%                   |YES              |YES                          |80%                          ||
|        |                                                                                                        |                      |                 |                             |                             ||
|        |**Mortgage**                                                                                            |                      |                 |                             |                             ||
|        |POST /games /{gameId} /players /{playerName} /properties /{propertyName} /mortgage                      |100%                  |YES              |YES                          |100%                         ||
|        |DELETE /games /{gameId} /players /{playerName} /properties /{propertyName} /mortgage                    |100%                  |YES              |YES                          |100%                         ||
|        |                                                                                                        |                      |                 |                             |                             ||
|        |**Interaction with another player**                                                                     |                      |                 |                             |                             ||
|MUSTHAVE|DELETE /games /{gameId} /players /{playerName} /properties /{propertyName} /visitors /{debtorName} /rent|100%                  |YES              |YES                          |100%                         ||
|        |With potential debt                                                                                     |100%                  |YES              |YES                          |100%                         ||
|        |                                                                                                        |                      |                 |                             |                             ||
|        |**Prison**                                                                                              |                      |                 |                             |                             ||
|        |POST /games /{gameId} /prison /{playerName} /fine                                                       |100%                  |YES              |YES                          |100%                         ||
|        |POST /games /{gameId} /prison /{playerName} /free                                                       |100%                  |YES              |YES                          |100%                         ||
|        |                                                                                                        |                      |                 |                             |                             ||
|        |**Auctions**                                                                                            |                      |                 |                             |                             ||
|        |GET /games /{gameId} /bank /auctions                                                                    |0%                    |NO               |NO                           |0%                           ||
|        |POST /games /{gameId} /bank /auctions /{propertyName} /bid                                              |0%                    |NO               |NO                           |0%                           ||
|        |                                                                                                        |                      |                 |                             |                             ||
|        |**Token**                                                                                               |                      |                 |                             |                             ||
|        |authorisation                                                                                           |100%                  |YES              |YES                          |100%                         |Geïmplementeerd zoals meneer zijn token.|

## Client bug(s):

