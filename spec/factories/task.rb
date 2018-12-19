FactoryBot.define do
  factory :task do
    title { Faker::Lorem.sentence }
    done { Faker::Boolean.boolean }
  end
end
