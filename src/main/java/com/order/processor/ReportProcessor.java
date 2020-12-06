package com.order.processor;

import com.order.dto.ReportDTO;
import com.order.mapper.ReportMapper;
import com.order.service.ReportService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class ReportProcessor {
    private ReportService reportService;
    private ReportMapper reportMapper;
    
    public List<ReportDTO> findALl(ReportDTO reportDTO, Pageable pageable) {
        return reportService.findAll(pageable).getContent().stream()
                       .map(reportMapper::toDTO)
                       .collect(Collectors.toList());
    }
    
    public Long count(ReportDTO reportDTO){
        return reportService.count();
    }
}
