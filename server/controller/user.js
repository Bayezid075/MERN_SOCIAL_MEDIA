import User from "../models/user.js";
// GET Specific Profile
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Get Friends of Specific Id
export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const friendList = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriendList = friendList.map(
      ({ _id, firstName, lastName, location, picturePath }) => {
        return { _id, firstName, lastName, location, picturePath };
      }
    );

    res.status(200).json({ formattedFriendList });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add or Remove Friends
export const addRemoveFriends = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const usr = await User.findById(id);
    const friendList = await User.findById(friendId);

    if (usr.friends.includes(friendId)) {
      usr.friends = usr.friends.filter((id) => id !== friendId);
      usr.friends = friendList.friends.filter((id) => id !== id);
    } else {
      usr.friends.push(id);
      friendList.friends.push(friendId);
    }
    await usr.save();
    await friendList.save();

    const friendL = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriendList = friendL.map(
      ({ _id, firstName, lastName, location, picturePath }) => {
        return { _id, firstName, lastName, location, picturePath };
      }
    );
    res.status(200).json({ formattedFriendList });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
