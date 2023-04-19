SELECT 
    TIMESTAMPADD(
        SECOND, 
        FLOOR(
            RAND() * 
            TIMESTAMPDIFF(SECOND, '2022-01-01 01:00:00', '2022-01-01 03:00:00')
        ), 
        '2022-01-01 00:00:00'
    ) AS random_datetime;