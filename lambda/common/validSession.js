const validSession = async (session_id, connection, get_id=false) => {
  const [ session_ids ] = await connection.execute(`select user_id from sessions 
                                                where session_id = "${session_id}";`);

  if (get_id) {
    return session_ids.length > 0 ? session_ids[0].user_id : null;
  } else {
    return session_ids.length > 0 ? true : false;
  }
}

module.exports = validSession;