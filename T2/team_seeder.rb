$:.push './'
require 'tables/team'

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