//
// Onze lokale 'in memory database'.
// We simuleren een asynchrone database met een array van objecten.
// De array bevat een aantal dummy records.
// De database heeft twee methoden: get en add.
// Opdracht: Voeg de overige methoden toe.
//
const database = {
    // het array met dummy records. Dit is de 'database'.
    _data: [
        {
            id: 0,
            firstName: 'Hendrik',
            lastName: 'van Dam',
            emailAdress: 'hvd@server.nl'
            // Hier de overige velden uit het functioneel ontwerp
        },
        {
            id: 1,
            firstName: 'Marieke',
            lastName: 'Jansen',
            emailAdress: 'm@server.nl'
            // Hier de overige velden uit het functioneel ontwerp
        }
    ],

    // Ieder nieuw item in db krijgt 'autoincrement' index.
    // Je moet die wel zelf toevoegen aan ieder nieuw item.
    _index: 2,
    _delayTime: 500,

    getAll(callback) {
        // Simuleer een asynchrone operatie
        setTimeout(() => {
            // Roep de callback aan, en retourneer de data
            callback(null, this._data)
        }, this._delayTime)
    },

    getById(id, callback) {
        // Simuleer een asynchrone operatie
        setTimeout(() => {
            const item = this._data.find((item) => item.id === id)
            if (!item) {
                callback({ message: `Error: id ${id} does not exist!` }, null)
            } else {
                callback(null, item)
            }
        }, this._delayTime)
    },

    add(item, callback) {
        // Simuleer een asynchrone operatie
        setTimeout(() => {
            // Voeg een id toe en voeg het item toe aan de database
            item.id = this._index++
            // Voeg item toe aan de array
            this._data.push(item)

            // Roep de callback aan het einde van de operatie
            // met het toegevoegde item als argument, of null als er een fout is opgetreden
            callback(null, item)
        }, this._delayTime)
    },
    delete(id, callback) {
        // Simuleer een asynchrone operatie
        setTimeout(() => {
            // Zoek de index van het item dat moet worden verwijderd
            const index = this._data.findIndex((item) => item.id === id)
            if (index === -1) {
                // Als het item niet is gevonden, retourneer een foutmelding
                callback({ message: `Error: item  not found!` }, null)
            } else {
                // Verwijder het item uit de array
                const deletedItem = this._data.splice(index, 1)[0]
                // Roep de callback aan met het verwijderde item als argument
                callback(null, deletedItem)
            }
        }, this._delayTime)
    }
}

module.exports = database
// module.exports = database.index;
