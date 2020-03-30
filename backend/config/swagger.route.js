/**
     * @swagger
     * definition:
     *   Player:
     *     properties:
     *       firstName:
     *         type: string
     *         required: true
     *       lastName:
     *         type: string
     *         required: true
     *
     *   Players:
     *     type: array
     *     items:
     *       type: object
     *       schema:
     *       $ref: '#/definitions/Player'
     *
     * /players/{id}:
     *  get:
     *    tags :
     *      - Players
     *    summary: "Should return player by id"
     *    description: "Use to return player by his id"
     *    consumes:
     *      - application/json
     *    parameters:
     *      - name: id
     *        in: query
     *        type: number
     *        required: true
     *        description: "Player id"
     *    responses:
     *      '200':
     *        description: "Successfully fetch player"
     *        schema:
     *          $ref: '#/definitions/Player'
     *      '404':
     *        description: "Player not found"
     *  put:
     *    tags :
     *      - Players
     *    summary: "Should update a player"
     *    description: "Use to update a player"
     *    consumes:
     *      - application/json
     *    parameters:
     *      - name: id
     *        in: query
     *        type: number
     *        required: true
     *        description: "Player id"
     *      - name: player
     *        in: body
     *        schema:
     *          type: object
     *          properties:
     *            firstName:
     *              type: string
     *              required: true
     *            lastName:
     *              type: string
     *              required: true
     *    responses:
     *      '200':
     *        description: "Successfully update player"
     *        schema:
     *          $ref: '#/definitions/Player'
     *      '400':
     *        description: "Bad request. Could not update player"
     *      '404':
     *        description: "Player not found"
     *
     *  delete:
     *    tags :
     *      - Users
     *    summary: "Should delete player by id"
     *    description: "Use to delete player by his id"
     *    consumes:
     *      - application/json
     *    parameters:
     *      - name: id
     *        in: query
     *        type: number
     *        required: true
     *        description: "Player id"
     *    responses:
     *      '200':
     *        description: "Successfully delete player"
     *        schema:
     *          $ref: '#/definitions/Player'
     *      '404':
     *        description: "Player not found"
     */

/**
     * @swagger
     * /players:
     *  get:
     *    tags :
     *      - Players
     *    summary: Should return all players
     *    description: Use to return all players
     *    consumes:
     *      - application/json
     *    responses:
     *      '200':
     *        description: Successfully fetch all players
     *  post:
     *    tags :
     *      - Players
     *    summary: Should save new player
     *    description: Use to save a new player
     *    consumes:
     *      - application/json
     *    parameters:
     *      - name: plauer
     *        in: body
     *        schema:
     *          type: object
     *          properties:
     *            firstName:
     *              type: string
     *              required: true
     *            lastName:
     *              type: string
     *              required: true
     *    responses:
     *      '201':
     *        description: Player created successfully
     */
