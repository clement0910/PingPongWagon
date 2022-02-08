class MatchesController < ApplicationController
  def create
    @match = Match.new(match_params)
    if @match.save
      redirect_to root_path, notice: 'Match successfully created.'
    else
      ap @match.errors.messages
      respond_to do |format|
        format.json { render json: { error_message: @match.errors.full_messages }, status: :unprocessable_entity }
      end
    end
  end

  private

  def match_params
    params.require(:match).permit(:winner_score, :loser_score, :winner_id, :loser_id)
  end
end