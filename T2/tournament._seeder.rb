$:.push './'
require 'tables/tournament'

tournaments = [
    { name: 'Copa do Brasil', country: 'Brazil', foundation_year: 1990 },
    { name: 'Libertadores da Ámerica', country: 'Argentina', foundation_year: 1970 },
    { name: 'Brasileirão Assaí', country: 'Brazil', foundation_year: 1955 },
    { name: 'Premier League', country: 'England', foundation_year: 1930},
    { name: 'Campeonato Carioca', country: 'Brazil', foundation_year: 1965 },
]

tournaments.each do |tournament|
    Tournament.create(name: tournament[:name], country: tournament[:country], foundation_year: tournament[:foundation_year])
end