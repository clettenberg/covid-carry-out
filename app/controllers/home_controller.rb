class HomeController < ApplicationController
  include ActionView::Helpers::DateHelper

  def index
    last_updated = time_ago_in_words(Event.order(created_at: :desc)
      .limit(1)
      .pluck(:created_at)
      .first)

    render component: "App", props: {updatedAt: last_updated}
  end
end
