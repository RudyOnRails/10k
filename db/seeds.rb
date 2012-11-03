# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

ActivityType.delete_all
book = ActivityType.create(:name => 'Book')
course = ActivityType.create(:name => 'Course')
project = ActivityType.create(:name => 'Project')
meetup = ActivityType.create(:name => 'Meetup')
conference = ActivityType.create(:name => 'Conference')
internship = ActivityType.create(:name => 'Internship')
apprenticeship = ActivityType.create(:name => 'Apprenticeship')


User.delete_all
kevin = User.create(:email => "musiorski@gmail.com", :password => "10kportfolio", :password_confirmation => "10kportfolio", :confirmed_at => Time.now)
zeke = User.create(:email => "ebinion@gmail.com", :password => "10kportfolio", :password_confirmation => "10kportfolio", :confirmed_at => Time.now)
greg = User.create(:email => "vincentgwilliams@gmail.com", :password => "10kportfolio", :password_confirmation => "10kportfolio", :confirmed_at => Time.now)
shawna = User.create(:email => "hello@shawna-x.com", :password => "10kportfolio", :password_confirmation => "10kportfolio", :confirmed_at => Time.now)
john = User.create(:email => "contrerasnet@gmail.com", :password => "10kportfolio", :password_confirmation => "10kportfolio", :confirmed_at => Time.now)

Activity.delete_all
#was about to seed activities