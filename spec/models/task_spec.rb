require 'rails_helper'

RSpec.describe Task, type: :model do
  it "has a valid factory" do
    task = build(:task)

    expect(task.valid?).to be(true)
  end

  it "must have a title" do
    task = build(:task, title: nil)

    expect(task.valid?).to be(false)
  end

  it "must either be done or not" do
    task = build(:task, done: nil)

    expect(task.valid?).to be(false)
  end
end
