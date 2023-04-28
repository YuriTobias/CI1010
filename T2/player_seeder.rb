$:.push './'
require 'tables/player'
require 'tables/team'

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