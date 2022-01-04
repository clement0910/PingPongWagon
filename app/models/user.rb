class User < ApplicationRecord
  devise :database_authenticatable,
         :rememberable,
         :omniauthable, omniauth_providers: [:github]


  has_many :scores, dependent: :destroy
  has_many :matches, through: :scores, dependent: :destroy

  def self.from_omniauth(access_token)
    ap access_token
    data = access_token.info
    ap data
    user = User.where(email: data["email"]).first

    user ||= User.create(
      email: data["email"],
      password: Devise.friendly_token[0, 20]
    )

    user.name = access_token.info.name
    user.image = access_token.info.image
    user.provider = access_token.provider
    user.uid = access_token.uid
    user.save

    user
  end
end