# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

teams = [
    { name:  'Flamengo', num_titles: 38 },
    { name: 'Cruzeiro', num_titles: 50 },
    { name: 'Maringá', num_titles: 2},
    { name: 'Coritiba', num_titles: 17},
    { name: 'Cuiabá', num_titles: 28 },
    { name: 'Liverpool', num_titles: 63 },
]

teams.each do |team|
    Team.create(name: team[:name], num_titles: team[:num_titles])
end

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

players = [
    { name: 'Leo Pelé', age: 24, career_time: 4, team_id: 1 },
    { name: 'Patrick', age: 30, career_time: 8, team_id: 2 },
    { name: 'Edenilson', age: 41, career_time: 30, team_id: 3 },
    { name: 'Gabigol', age: 26, career_time: 10, team_id: 4 },
    { name: 'Matheus Vital', age: 22, career_time: 5, team_id: 5 },
]

players.each do |player|
    Player.create(name: player[:name], age: player[:age], career_time: player[:career_time], team_id: player[:team_id])
end

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