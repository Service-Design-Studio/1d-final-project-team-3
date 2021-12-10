# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.create(email: 'email',
            username: 'user',
            create_date: 2019-04-17,
            last_session: 2020-11-31)


puts "user generated #{User.count}"

Recording.create(title: 'Sample',
                date: 2021-12-23,
                duration: 12.3,
                video_uri: 'test.com',
                police_notes: 'notes',
                transcription: 'signs',
                phone_IMEI: 1,
                user_id: 1)


puts "recording generated #{Recording.count}"

