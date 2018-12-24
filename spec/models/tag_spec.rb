require 'rails_helper'

RSpec.describe Tag, type: :model do
  it "has a valid factory" do
    tag = build(:tag)

    expect(tag.valid?).to eq(true)
  end

  it "must have a title" do
    tag = build(:tag, title: nil)

    expect(tag.valid?).to eq(false)
  end
end
