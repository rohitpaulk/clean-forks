FactoryGirl.define do
  factory :git_repository do
    description "Dummy repository description"
    parent_name_with_owner "dummy/repo"
    forked_at { 2.days.ago }
    user
  end
end
