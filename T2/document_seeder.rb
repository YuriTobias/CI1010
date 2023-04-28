$:.push './'
require 'tables/document'
require 'tables/player'

documents = [
    { number: 8478760, emission: '12/03/2005', player_id: 1 },
    { number: 8478760, emission: '27/06/2009', player_id: 2 },
    { number: 8478760, emission: '30/11/2002', player_id: 3 },
    { number: 8478760, emission: '24/02/2008', player_id: 4 },
    { number: 8478760, emission: '12/12/2012', player_id: 5 },
]

documents.each do |document|
    Document.create(number: document[:number], emission: document[:emission], player_id: document[:player_id])
end