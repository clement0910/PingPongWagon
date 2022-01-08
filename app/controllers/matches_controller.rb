class MatchesController < ApplicationController
  def create
    @match = Match.new(match_params)
    if @match.save
      redirect_to root_path, notice: 'Match successfully created.'
    else
      redirect_to root_path, alert: 'An Error has occured.'
    end
  end

  private

  def match_params
    params.require(:match).permit(:winner_score, :loser_score, :winner_id, :loser_id)
  end
end